import { Progress } from "@chakra-ui/react";

export default function Loader ({isLoading}: {isLoading:boolean}): JSX.Element {
    return (
        <>
            {isLoading && <Progress size='xs' isIndeterminate />}
        </>
    )
}
