import type { CoursePart } from "../types";
import Part from "./Part";


type ContentProps = {
    courseParts: CoursePart[]
};

const Content = (props: ContentProps) => {
    const { courseParts } = props;

    return (
        <div>
            {
                courseParts.map((c) => {
                    return (
                        <Part key={c.name} part={c}/>
                    );
                })
            }
        </div>
    );
};

export default Content;