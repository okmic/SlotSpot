import axios, { type AxiosInstance } from 'axios'
import appconfig from '../../appconfig'
import { handlerError } from './api.util'
import type { Slot, SlotFormData } from '../types/slot'

class ApiSlotService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: appconfig.backendUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async findByDate(date: string): Promise<Slot[]> {
    return await this.axiosInstance
      .get(`/api/slots`, { params: { date } })
      .then(r => r.data.slots)
      .catch(e => handlerError(e))
  }

  async create(data: SlotFormData): Promise<Slot> {
    return await this.axiosInstance
      .post('/api/slots', data)
      .then(r => r.data.slot)
      .catch(e => handlerError(e))
  }

  async delete(id: string): Promise<Slot> {
    return await this.axiosInstance
      .delete(`/api/slots/${id}`)
      .then(r => r.data.slot)
      .catch(e => handlerError(e))
  }
}

export default new ApiSlotService()