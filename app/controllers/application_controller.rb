class ApplicationController < ActionController::API
  include ActionController::Rendering

  def fallback_index_html
    render file: "public/index.html", content_type: 'text/html'
  end
end
