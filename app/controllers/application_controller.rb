class ApplicationController < ActionController::API
  def fallback_index_html
    # render file: 'public/index.html'
    render plain: "OK"
  end
end
