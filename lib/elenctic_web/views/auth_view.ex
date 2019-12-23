defmodule ElencticWeb.AuthView do
  use ElencticWeb, :view

  def render("jwt.json", %{jwt: jwt}) do
    %{jwt: jwt}
  end
end
