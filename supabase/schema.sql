-- Профили пользователей
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  created_at timestamptz default now() not null
);

-- Привычки
create table if not exists public.habits (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null check (char_length(title) between 1 and 50),
  icon text not null default '🎯',
  frequency text not null default 'daily' check (frequency in ('daily', 'weekly')),
  streak integer not null default 0 check (streak >= 0),
  completed_dates date[] not null default '{}',
  created_at timestamptz default now() not null
);

-- Индексы для быстрого поиска
create index if not exists habits_user_id_idx on public.habits(user_id);
create index if not exists habits_created_at_idx on public.habits(created_at desc);

-- Автоматическое создание профиля при регистрации
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.habits enable row level security;

-- Политики для profiles
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Политики для habits
create policy "Users can view own habits"
  on public.habits for select
  using (auth.uid() = user_id);

create policy "Users can insert own habits"
  on public.habits for insert
  with check (auth.uid() = user_id);

create policy "Users can update own habits"
  on public.habits for update
  using (auth.uid() = user_id);

create policy "Users can delete own habits"
  on public.habits for delete
  using (auth.uid() = user_id);