import * as React from 'react';

export type As<P = any> = {
    as?: keyof React.ReactHTML | React.FC<P> | React.ComponentClass<P>;
};
