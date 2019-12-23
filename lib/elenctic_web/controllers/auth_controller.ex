defmodule ElencticWeb.AuthController do
  use ElencticWeb, :controller
  alias Elenctic.UserManager.Guardian
  alias Elenctic.UserManager
  alias Elenctic.UserManager.User

  action_fallback ElencticWeb.FallbackController

  def sign_in(conn, %{"email" => email, "password" => password}) do
    case UserManager.token_sign_in(email, password) do
      {:ok, token, _claims} ->
        conn |> render("jwt.json", jwt: token)

      _ ->
        {:error, :unauthorized}
    end
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- UserManager.create_user(user_params),
         {:ok, token, _claims} <- Guardian.encode_and_sign(user) do
      conn |> render("jwt.json", jwt: token)
    end
  end
end
