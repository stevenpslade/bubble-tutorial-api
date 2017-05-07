# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(email: 'steven@example.com')
site = Site.create(url: 'example.com', user_id: user.id, site_code: '123456')

tutorials = Tutorial.create([
    {name: 'Welcome Tutorial', active: true, page_url: 'example.com/welcome', skippable: false, show_steps: true, user_id: user.id, site_id: site.id},
    {name: 'Unwelcome Tutorial', active: false, page_url: 'example.com/welcome', skippable: false, show_steps: true, user_id: user.id, site_id: site.id}
  ])

tutorial_items = TutorialItem.create([
    {title: 'step1', content: 'welcome to this site.', active: true, order: 1, css_selector: '.welcome-banner', tutorial: tutorials.first},
    {title: 'step2', content: 'click here to signup...', active: true, order: 2, css_selector: '#signup', tutorial: tutorials.first},
    {title: 'step3', content: 'give us your info!', active: true, order: 3, css_selector: '#newsletter', tutorial: tutorials.first}
  ])