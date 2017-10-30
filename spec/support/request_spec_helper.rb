module RequestSpecHelper
  # Parse JSON response to ruby hash
  def json
    JSON.parse(response.body)
  end

  def authenticated_header(user, site_url = '')
    token = Knock::AuthToken.new(payload: { sub: user.id }).token
    { Origin: site_url, Authorization: "Bearer #{token}" }
  end
end