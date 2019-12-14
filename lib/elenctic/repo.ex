defmodule Elenctic.Repo do
  use Ecto.Repo,
    otp_app: :elenctic,
    adapter: Ecto.Adapters.Postgres
end
