import React, { useState } from 'react';

import Button from '/components/utils/button/Button.jsx';

function Filters({filters}) {
    const [showFilters, setShowFilters] = useState(true);
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
