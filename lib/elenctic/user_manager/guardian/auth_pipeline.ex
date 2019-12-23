defmodule Elenctic.UserManager.Guardian.AuthPipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :elenctic,
    module: Elenctic.Guardian,
    error_handler: Elenctic.AuthErrorHandler

  plug Guardian.Plug.VerifyHeader, realm: "Bearer"
  plug Guardian.Plug.EnsureAuthenticated
  plug Guardian.Plug.LoadResource
end
