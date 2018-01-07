class ApplicationController < ActionController::API
  def fallback_index_html

    f = File.open("public/index.html", "r")
    f.each_line do |line|
      puts line
    end
    f.close

    render file: 'public/index.html'
  end
end
