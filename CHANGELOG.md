# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/nathanab/beacon/compare/master...HEAD)

## [v3.16.0](https://github.com/nathanab/beacon/compare/v3.15.0...v3.16.0)
- Add user profile page
- Add date creator to date page
- Add user dropdown to date builder

## [v3.15.1](https://github.com/nathanab/beacon/compare/v3.15.0...v3.15.1)
- Fix comments error in creating date

## [v3.15.0](https://github.com/nathanab/beacon/compare/v3.14.0...v3.15.0)
- Add comments feature
- Update save button to use bookmark icon with "Save" text

## [v3.14.0](https://github.com/nathanab/beacon/compare/v3.13.0...v3.14.0)
- Add A/B/C test for save button

## [v3.13.0](https://github.com/nathanab/beacon/compare/v3.12.0...v3.13.0)
- Add preview tab to date builder
- Add delete button to date builder

## [v3.12.0](https://github.com/nathanab/beacon/compare/v3.11.0...v3.12.0)
- Update to Node v14
- Update to Next.js v10
- Update to React v17
- Fix z-index issues

## [v3.11.0](https://github.com/nathanab/beacon/compare/v3.10.1...v3.11.0)
- Added header bar login button and profile menu
- Added login functionality
- Added saved dates page
- Removed comment teaser button
- Hooked up save and unsave functionality to new api

## [v3.10.1](https://github.com/nathanab/beacon/compare/v3.10.0...v3.10.1)
- Fix broken Instagram thumbnails by loading them through a new Beacon API endpoint. See [Facebook docs](https://developers.facebook.com/docs/plugins/oembed/) for more info.

## [v3.10.0](https://github.com/nathanab/beacon/compare/v3.9.0...v3.10.0)
- Add comment teaser

## [v3.9.0](https://github.com/nathanab/beacon/compare/v3.8.0...v3.9.0)
- Transition like button to a permanent feature
- Fixed issue with storing liked dates
- Change neighborhood filtering to filter by intersection instead of union

## [v3.8.0](https://github.com/nathanab/beacon/compare/v3.7.1...v3.8.0)
- Remove calendar/share buttons. RIP
- Add like button A/B test

## [v3.7.1](https://github.com/nathanab/beacon/compare/v3.7.0...v3.7.1)
- Fix setting section number

## [v3.7.0](https://github.com/nathanab/beacon/compare/v3.6.0...v3.7.0)
- Remove Date Details button A/B test
- Add Calendar button A/B test

## [v3.6.0](https://github.com/nathanab/beacon/compare/v3.5.1...v3.6.0)
- Remove splash page A/B test
- Add "Date Details" button A/B test

## [v3.5.1](https://github.com/nathanab/beacon/compare/v3.5.0...v3.5.1)
- Change title in date card to be link-styled

## [v3.5.0](https://github.com/nathanab/beacon/compare/v3.4.0...v3.5.0)
- Some visual quirks fixed on Safari
- Added Google Optimize plugin with A/B test for Discover header

## [v3.4.0](https://github.com/nathanab/beacon/compare/v3.3.0...v3.4.0)
- Fix date order not being respected
- Added explicit section number field to date editor
- Update toggles in admin table to be more helpful
- Fix filter chips not being un-toggled correctly
- Changed new date section on Discover to display the current month
- Fix `Back to Explore` button not respecting filters set by Discover page

## [v3.3.0](https://github.com/nathanab/beacon/compare/v3.2.0...v3.3.0)
- Added LogRocket integration

## [v3.2.0](https://github.com/nathanab/beacon/compare/v3.1.2...v3.2.0)
- Switch tips section to Markdown

## [v3.1.2](https://github.com/nathanab/beacon/compare/v3.1.1...v3.1.2)
- Fixed text overflow on tips section
- Added click events to various buttons and navigation

## [v3.1.1](https://github.com/nathanab/beacon/compare/v3.1.0...v3.1.1)
- Change IG credit text to black
- Make text in Sort By dropdown same size as the Add Filters button
- On homepage, center all the header text in a single column

## [v3.1.0](https://github.com/nathanab/beacon/compare/v3.0.3...v3.1.0)
- Add instagram photo credit

## [v3.0.3](https://github.com/nathanab/beacon/compare/v3.0.2...v3.0.3)
- Fix date card navigation by using anchor instead of programmatic link

## [v3.0.2](https://github.com/nathanab/beacon/compare/v3.0.1...v3.0.2)
- Fix placeholder images capturing mouse clicks and drags

## [v3.0.1](https://github.com/nathanab/beacon/compare/v3.0.0...v3.0.1)
- Fix admin page merge leftover
- Fix outbound link attributes

## [v3.0.0](https://github.com/nathanab/beacon/compare/v2.4.2...v3.0.0)
- Implement new design!
- Update admin page with sortable and searchable data table

## [v2.4.2](https://github.com/nathanab/beacon/compare/v2.4.1...v2.4.2)
- Fix focus date label to be date name instead of date ID

## [v2.4.1](https://github.com/nathanab/beacon/compare/v2.4.0...v2.4.1)
- Fix focus date hook causing page reload

## [v2.4.0](https://github.com/nathanab/beacon/compare/v2.3.0...v2.4.0)
- Improve query param appearance/readability
- Fix scrolling on horizontal menu due to use of anchor tags
- Clean up meta tag appearance for SEO
- Change cost appearance from $$$'s to words
- Add routing for individual dates
- Add date links to date builder
- Update tags page so that tags causing 0 search results are disabled
- Fix Google Analytics not tracking events and page views

## [v2.3.0](https://github.com/nathanab/beacon/compare/v2.2.0...v2.3.0)
- Add Facebook pixel

## [v2.2.0](https://github.com/nathanab/beacon/compare/v2.1.2...v2.2.0)
- Refactor and expand routing to include filters in URL

## [v2.1.2](https://github.com/nathanab/beacon/compare/v2.1.1...v2.1.2)
- Fix Google Analytics

## [v2.1.1](https://github.com/nathanab/beacon/compare/v2.1.0...v2.1.1)
- Add back redirect to www

## [v2.1.0](https://github.com/nathanab/beacon/compare/v2.0.0...v2.1.0)
- Add support for `At Home` dates
- Add support for non-Instagram date images, i.e. full image urls
- Hide neighborhoods with no dates
- Sort tags and neighborhoods alphabetically
- Update "Discover Dates" row to feature "At Home" dates

## [v2.0.0](https://github.com/nathanab/beacon/compare/v1.2.0...v2.0.0)
- Refactor app to use server-side rendering via next.js
- Have date cards on mobile auto-expand when clicked from Discover

## [v1.2.0](https://github.com/nathanab/beacon/compare/v1.1.4...v1.2.0)
- Add admin mode with date builder
- Filter dates on new `active` field
- Add inertia scrolling to horizontal menus

## [v1.1.4](https://github.com/nathanab/beacon/compare/v1.1.3...v1.1.4) - 2020-02-19
- Fix footer "about" link href

## [v1.1.3](https://github.com/nathanab/beacon/compare/v1.1.2...v1.1.3) - 2020-02-19
- Fix mobile menu "about" link href

## [v1.1.2](https://github.com/nathanab/beacon/compare/v1.1.1...v1.1.2) - 2020-02-19
- Add redirect to www

## [v1.1.1](https://github.com/nathanab/beacon/compare/v1.1.0...v1.1.1) - 2020-02-19
- Fix Facebook login url

## [v1.1.0](https://github.com/nathanab/beacon/compare/v1.0.1...v1.1.0) - 2020-02-18
- Refactor desktop layout
  - Create footer with links
  - Remove app bar for desktop, replaced by nav buttons in header
  - Add mobile drawer with links
  - Add hero image
  - Remove account dropdown when not logged in

## [v1.0.1](https://github.com/nathanab/beacon/compare/v1.0.0...v1.0.1) - 2020-02-02
- Fix button stylings in login dialog

## v1.0.0 - 2019-12-25
- Initial release!
