import data from './data.json';

export default function handler(req: any, res: any) {
  res.status(200).json(data);
}