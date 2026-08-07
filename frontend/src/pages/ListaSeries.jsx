function ListaSeries(){
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <>
            <p>{user.listaSeries?.length > 0 ? user.listaSeries.map((serie) => serie.name).join(", ") : "Nenhuma série adicionada."}</p>
        </>
    )
}
export default ListaSeries;