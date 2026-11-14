export type Application = {
  id?: string;
  company: string;
  role: string;
  status: string;
  req_id: string;
  location: string;
  link: string;
  date_applied?: string;
};

export type ApplicationStatusHistory = {
  application_id: string;
  status: string;
  created_at: string;
};
