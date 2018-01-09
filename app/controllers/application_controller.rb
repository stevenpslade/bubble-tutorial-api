class ApplicationController < ActionController::API
  include ActionController::Rendering

  def fallback_index_html
    render file: "public/index.html", layout: true
  end
end
