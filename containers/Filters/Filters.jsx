import React, { useState } from 'react';

import Button from '/components/utils/button/Button.jsx';

function Filters() {
    const [showFilters, setShowFilters] = useState(true);
    console.log(showFilters);
    return (
        <div>
            <Button
                variant="tertiary"
                value="Hide Filters"
                onClick={() => setShowFilters(!showFilters)}
            />
        </div>
    );
}

export default Filters;
