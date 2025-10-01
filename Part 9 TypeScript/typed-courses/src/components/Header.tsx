

type HeaderProps = {
    courseName: string;
};

const Header = ({ courseName }: HeaderProps) => {
    return (<h2>{courseName}</h2>);
};

export default Header;