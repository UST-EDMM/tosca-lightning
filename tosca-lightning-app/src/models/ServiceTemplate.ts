import { Version } from './Version';
import { IdentifiableResource } from '../lib/resourceSupport';

export interface ServiceTemplate extends IdentifiableResource {
  id: string;
  name: string;
  namespace: string;
  qName: string;
  version: Version;
  logoUrl: string;
  topologyModelerUrl: string;
}
