require "test_helper"

class FeuilleteurControllerTest < ActionDispatch::IntegrationTest
  test "should get activer" do
    get feuilleteur_activer_url
    assert_response :success
  end
end
