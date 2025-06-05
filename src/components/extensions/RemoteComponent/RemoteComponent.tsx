import {
    createRemoteComponent,
    createRequires,
} from "@paciolan/remote-component";
import { resolve } from "../../../../remote-component.config.js";

// eslint-disable-next-line unicorn/no-abusive-eslint-disable
// eslint-disable-next-line
// @ts-ignore
const requires = createRequires(resolve);
const RemoteComponent = createRemoteComponent({ requires });

export default RemoteComponent;
