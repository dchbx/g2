# config valid for current version and patch releases of Capistrano
lock "~> 3.10.2"

set :application, "g2"
set :repo_url, "https://github.com/dchbx/g2.git"

set :deploy_to, '/var/www/deployments/g2'
set :rails_env, 'production'

set :bundle_binstubs, false
set :bundle_flags, "--quiet"
set :bundle_path, nil

set :pty, true

set :linked_files, (fetch(:linked_files, []) | ['config/mongoid.yml', 'config/initializers/devise.rb', 'config/secrets.yml', "config/environments/production.rb",'config/unicorn.rb', 'eyes/g2.eye.rb'])

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'pids', 'eye')

set :assets_roles, [:web, :app]

set :assets_prefix, 'packs'
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

namespace :deploy do
  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 20 do
      sudo "service eye_rails reload"
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
    end
  end

end

after "deploy:publishing", "deploy:restart"
