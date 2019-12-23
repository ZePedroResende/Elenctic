defmodule Elenctic.UserManager.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Argon2

  schema "users" do
    field :email, :string
    field :username, :string
    field :password_hash, :string

    # Virtual fields:
    field :password, :string, virtual: true

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :username, :password])
    |> downcase_email
    |> validate_required([:email, :username, :password])
    |> validate_length(:email, min: 5, max: 255)
    |> validate_format(:email, ~r/\A[^@\s]+@[^@\s]+\z/)
    |> validate_length(:username, min: 1, max: 30)
    |> validate_format(:email, ~r/[a-zA-Z0-9]+/)
    |> validate_length(:password, min: 5)
    |> unique_constraint(:email)
    |> unique_constraint(:username)
    |> put_password_hash
  end

  defp downcase_email(changeset) do
    update_change(changeset, :email, &String.downcase/1)
  end

  defp put_password_hash(
         %Ecto.Changeset{valid?: true, changes: %{password: password}} = changeset
       ) do
    put_change(changeset, :password_hash, Argon2.hash_pwd_salt(password))
  end

  defp put_password_hash(changeset), do: changeset
end
