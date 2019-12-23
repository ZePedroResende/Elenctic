defmodule ElencticWeb.Router do
  use ElencticWeb, :router

  alias Elenctic.UserManager.Guardian

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :jwt_authenticated do
    plug Guardian.AuthPipeline
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ElencticWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", ElencticWeb do
    pipe_through :api

    scope "/auth" do
      post "/sign_up", AuthController, :create
      post "/sign_in", AuthController, :sign_in
    end

    scope "/v1" do
    end
  end
end
