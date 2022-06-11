const createTaggedFiltersObject = (filter, value, filters) => {
    let taggedFilters = { ...filters };
    let taggedFiltersTypes = Object.keys(taggedFilters);

    if (taggedFiltersTypes.includes(filter)) {
        if (taggedFilters[filter].includes(value)) {
            taggedFilters[filter] = taggedFilters[filter].filter(
                (filterValue) => filterValue !== value
            );
            if (taggedFilters[filter].length === 0) {
                delete taggedFilters[filter];
            }
        } else {
            taggedFilters[filter] = [...taggedFilters[filter], value];
        }
    } else {
        taggedFilters[filter] = [value];
    }

    return taggedFilters;
};

export default createTaggedFiltersObject;
