/*
 * Copyright (C) 2018 The "mysteriumnetwork/mysterium-vpn" Authors.
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

// @flow
import { createLocalVue, mount } from '@vue/test-utils'
import { beforeEach, describe, it, expect } from '../../../helpers/dependencies'
import ConnectionHistory from '../../../../src/renderer/pages/connection-history'
import DIContainer from '../../../../src/app/di/vue-container'

describe('ConnectionHistory', () => {
  let wrapper

  const mockedRecords = [
    {
      id: '1',
      identity: '0x3b03a513fba4bd4868edd340f77da0c920150f3e',
      country: 'lt',
      start: '2018.09.24 14:23:23',
      status: 'Successful',
      duration: 35 * 60,
      bytesSent: 1024,
      bytesReceived: 6000
    }
  ]

  function mountConnectionHistory () {
    const localVue = createLocalVue()
    const dependencies = new DIContainer(localVue)
    dependencies.constant('tequilapiClient', {
      async connectionHistoryList () {
        return mockedRecords
      }
    })
    return mount(ConnectionHistory, {
      localVue
    })
  }

  beforeEach(() => {
    wrapper = mountConnectionHistory()
  })

  it('renders successfully', () => {
    expect(wrapper).to.be.ok
  })

  it('renders table with headers and list of records', async () => {
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('tr')).to.have.length(1 + mockedRecords.length)
  })

  it('renders countries', async () => {
    // TODO: render icons instead
    await wrapper.vm.$nextTick()
    const nodeText = wrapper.findAll('tr').at(1).findAll('td').at(1).element.innerText
    expect(nodeText).to.have.string('[lt]')
  })

  it('renders shortened identities', async () => {
    await wrapper.vm.$nextTick()
    const nodeText = wrapper.findAll('tr').at(1).findAll('td').at(1).element.innerText
    expect(nodeText).to.eql('[lt]0x3b03a513f...')
  })

  it('renders sent and received amounts', async () => {
    await wrapper.vm.$nextTick()
    const traffic = wrapper.findAll('tr').at(1).findAll('td').at(5).element.innerText
    expect(traffic).to.eql('1.00KB/5.86KB')
  })

  it('renders duration time', async () => {
    await wrapper.vm.$nextTick()
    const duration = wrapper.findAll('tr').at(1).findAll('td').at(4).element.innerText
    expect(duration).to.eql('00:35:00')
  })
})