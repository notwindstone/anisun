const searchTitles = async (search?: string | undefined): Promise<string> => {
    return search ?? "";
};

export default searchTitles;