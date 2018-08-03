/*
 * Copyright (C) 2017 The "MysteriumNetwork/mysterion" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import type from '../types'

const state = {
  terms: {
    htmlContent: null
  }
}

const mutations = {
  [type.TERMS] (state, terms) {
    state.terms = terms
  }
}

const getters = {
  termsAndConditions: (store) => store.terms
}

const actions = {
  [type.TERMS] ({ commit }, terms) {
    commit(type.TERMS, terms)
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
