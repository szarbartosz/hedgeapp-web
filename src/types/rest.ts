export type Developer = {
  id: number;
  name: string;
};

export type Status = {
  id: number;
  name: string;
};

export type Location = {
  status_id: number;
  developer_id: number;
  name: string;
  issue_date: string;
  inspection_date: string;
  deforestation_date: string;
  planting_date: string;
  deforestation_done: boolean;
  planting_done: boolean;
};

export type LocationInputs = {
  locationName: string;
  developer: string;
  status: string;
  issueDate: string;
  inspectionDate: string;
  deforestationDate: string;
  deforestationDone: boolean;
  plantingDate: string;
  plantingDone: boolean;
};
