import type { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type PartProps = {
    part: CoursePart
}

const Part = (props: PartProps) => {

    const { part } = props;

    switch(part.kind) {
        case 'basic':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <i>{part.description}</i>
                </div>
            );
        case 'group':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <p>Project exercises {part.groupProjectCount}</p>
                </div>
            );
        case 'background':
            return (
                <div>
                    <h3>{part.name} {part.exerciseCount}</h3>
                    <i>{part.description}</i>
                    <p>{part.backgroundMaterial}</p>
                </div>
            );
        default:
            return assertNever(part);
    }
};

export default Part;