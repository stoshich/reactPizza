import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={470}
        viewBox="0 0 280 470"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="125" cy="125" r="125" />
        <rect x="0" y="262" rx="10" ry="10" width="250" height="20" />
        <rect x="0" y="296" rx="10" ry="10" width="250" height="90" />
        <rect x="0" y="406" rx="10" ry="10" width="90" height="27" />
        <rect x="105" y="404" rx="25" ry="25" width="153" height="45" />
    </ContentLoader>
)

export default Skeleton