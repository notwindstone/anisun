import {delay} from "@/utils/notify/functions/delay";
import {critical} from "@/utils/notify/functions/critical";
import {done} from "@/utils/notify/functions/done";
import {notAuthenticated} from "@/utils/notify/functions/notAuthenticated";
import {incorrectInput} from "@/utils/notify/functions/incorrectInput";

export const notify = {
    done: done,
    delay: delay,
    incorrectInput: incorrectInput,
    notAuthenticated: notAuthenticated,
    critical: critical,
}