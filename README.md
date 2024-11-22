# P14 - HrNet

## Introduction

HRnet is an inside web application used by `WealthHeath`, and the last project for the javascript React course of
OpenClassRooms.

For this project we needed to convert a jQuery application to a React application.

For that we needed to :

- Convert the entire project
- Convert one of the 4 jQuery plugins to a React one (publish on [npm](https://www.npmjs.com/))
- Replace the 3 others for React components, that we do ourselves, or we import from existent library if time is short
- Do Lighthouse performance test and compare both application

## Install dependencies

    $ yarn

## Launch front

    $ yarn dev

## Build project

    $ yarn build
    $ yarn add -g http-server
    $ yarn add serve --dev
    $ serve -s dist

## Prerequisites

- [@heroicons/react](https://heroicons.com/)
- [zod](https://zod.dev/)
- [react-redux](https://react-redux.js.org/)
- [tailwindcss](https://tailwindcss.com/)
- [axios](https://axios-http.com/fr/docs/intro)
- [@bipce/hrnet_modal_package](https://www.npmjs.com/package/@bipce/hrnet_modal_package)