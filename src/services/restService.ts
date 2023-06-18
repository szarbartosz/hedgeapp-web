import axios from 'axios';
import { LocationInputs } from '../types/rest';

export const fetchDevelopers = () =>
  axios
    .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/developers`, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data?.developers;
    });

export const fetchStatuses = () =>
  axios
    .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/statuses`, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data?.statuses;
    });

export const fetchLocations = () =>
  axios
    .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/locations`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.locations);
      return res.data?.locations;
    });

export const fetchLocation = (id: number) =>
  axios
    .get(`${import.meta.env.VITE_BACKEND_DOMAIN}/locations/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data?.location;
    });

export const addLocation = (data: LocationInputs) =>
  axios
    .post(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/locations`,
      {
        status_id: parseInt(data.status),
        developer_id: parseInt(data.developer),
        name: data.locationName,
        issue_date: data.issueDate
          ? new Date(data.issueDate).toISOString()
          : null,
        inspection_date: data.inspectionDate
          ? new Date(data.inspectionDate).toISOString()
          : null,
        deforestation_date: data.deforestationDate
          ? new Date(data.deforestationDate).toISOString()
          : null,
        planting_date: data.plantingDate
          ? new Date(data.plantingDate).toISOString()
          : null,
        deforestation_done: data.deforestationDone,
        planting_done: data.plantingDone,
      },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      return res.data;
    });
