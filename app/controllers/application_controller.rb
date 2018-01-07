class ApplicationController < ActionController::API
  def fallback_index_html
    render file: "public/index.html", content_type: "text/html"
  end
end
