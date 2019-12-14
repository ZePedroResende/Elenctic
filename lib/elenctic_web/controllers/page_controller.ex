defmodule ElencticWeb.PageController do
  use ElencticWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
