class ApplicationController < ActionController::API
  def fallback_index_html
    render :file => 'build/index.html'
  end
end
