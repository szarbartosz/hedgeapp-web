import {
  DeveloperType,
  LocationType,
  LocationInputs,
  StatusType,
} from '../types/rest';

export const mapLocations = (
  locations: LocationType[],
  developers: DeveloperType[],
  statuses: StatusType[]
): LocationInputs[] =>
  locations.map((location: LocationType) =>
    mapLocation(location, developers, statuses)
  );

export const mapLocation = (
  location: LocationType,
  developers: DeveloperType[],
  statuses: StatusType[]
): LocationInputs => ({
  locationId: location.id,
  locationName: location.name,
  developer:
    developers?.find((developer) => developer.id === location.developer_id)
      ?.name || 'deweloper nieznany',
  status:
    statuses?.find((status) => status.id === location.status_id)?.name ||
    'status nieznany',
  issueDate: formatDate(location.issue_date),
  inspectionDate: formatDate(location.inspection_date),
  deforestationDate: formatDate(location.deforestation_date),
  plantingDate: formatDate(location.planting_date),
  deforestationDone: location.deforestation_done,
  plantingDone: location.planting_done,
});

const formatDate = (date: string): string => {
  const formatter = new Intl.DateTimeFormat('pl', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return !!date ? formatter.format(new Date(date)) : '';
};
