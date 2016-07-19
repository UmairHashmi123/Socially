import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import { Counts } from 'meteor/tmeasday:publish-counts';

import template from './partiesList.html';
import { Parties } from '../../../api/parties/index';
import { name as PartiesSort } from '../partiesSort/partiesSort';
import { name as PartiesMap } from '../partiesMap/partiesMap';
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyRemove } from '../partyRemove/partyRemove';
import { name as PartyCreator } from '../partyCreator/partyCreator';
import { name as PartyRsvp } from '../partyRsvp/partyRsvp';
import { name as PartyRsvpsList } from '../partyRsvpsList/partyRsvpsList';



class PartiesList {
  constructor($scope, $reactive) {
    'ngInject';
    const vm = this;
    $reactive(vm).attach($scope);
    vm.perPage = 4;
    vm.page = 1;
    vm.sort = {
      name: 1,
    };
    vm.searchText = '';

    vm.subscribe('parties', () => [{
      limit: parseInt(vm.perPage),
      skip: parseInt((vm.getReactively('page') - 1) * vm.perPage),
      sort: vm.getReactively('sort'),
    }, vm.getReactively('searchText'),
    ]);

    vm.subscribe('users');

    vm.helpers({
      parties() {
        return Parties.find({ }, {
          sort: vm.getReactively('sort'),
        });
      },
      partiesCount() {
        return Counts.get('numberOfParties');
      },
      isLoggedIn() {
        return !!Meteor.userId();
      },
      currentUserId() {
        return Meteor.userId();
      },
    });
  }

  isOwner(party) {
    return this.isLoggedIn && party.owner === this.currentUserId;
  }

  pageChanged(newPage) {
    this.page = newPage;
  }

  sortChanged(sort) {
    this.sort = sort;
  }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  utilsPagination,
  PartiesSort,
  PartiesMap,
  PartyAdd,
  PartyRemove,
  PartyCreator,
  PartyRsvp,
  PartyRsvpsList,
]).component(name, {
  template,
  controllerAs: name,
  controller: PartiesList,
})
.config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('parties', {
      url: '/parties',
      template: '<parties-list></parties-list>',
    });
}