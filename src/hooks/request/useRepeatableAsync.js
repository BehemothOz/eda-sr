import { useMemo, useRef } from 'react';
import { repeatable } from 'libs/repeatable';
import { useMessage } from 'hooks/useMessage';

const LIMIT = 3;
const MSG_ERROR = 'Connection is broken. Repeat the request.';
const MSG_RETRY = 'Attempt to retry request..';

export const useRepeatableAsync = asyncFunc => {
    const asyncFuncRef = useRef(asyncFunc);
    const msg = useMessage();

    const repeatableRun = useMemo(
        () =>
            repeatable(asyncFuncRef.current, {
                max: LIMIT,
                onError: ({ _retryCount }) => {
                    const msgRetry = _retryCount ? MSG_RETRY : MSG_ERROR;
                    msg.error(msgRetry);
                },
            }),
        [msg]
    );

    return repeatableRun;
};
