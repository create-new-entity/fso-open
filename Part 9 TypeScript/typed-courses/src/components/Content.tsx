
type CoursePart = {
    name: string;
    exerciseCount: number;
}

type ContentProps = {
    courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
    const { courseParts } = props;
    const style = {
        display: 'flex',
        justifyContent: 'flex-start',
        gap: '5px',
        alignItems: 'center'
    };

    return (
        <div>
            {
                courseParts.map((c) => {
                    return (
                        <div style={style} key={c.name}>
                            <p>{c.name}</p>
                            <p>{c.exerciseCount}</p>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Content;