import {delay} from "@/utils/Notifications/functions/delay";
import {critical} from "@/utils/Notifications/functions/critical";
import {done} from "@/utils/Notifications/functions/done";
import {notAuthenticated} from "@/utils/Notifications/functions/notAuthenticated";
import {incorrectInput} from "@/utils/Notifications/functions/incorrectInput";
import {loading} from "@/utils/Notifications/functions/loading";

export const notify = {
    done: done,
    loading: loading,
    delay: delay,
    incorrectInput: incorrectInput,
    notAuthenticated: notAuthenticated,
    critical: critical,
};