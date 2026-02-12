import { Grid } from "@radix-ui/themes"
import { Column } from "./Column"
import { useState } from "react";
import data from "../utils/data.json"

export const Board = () => {

    const [columns, setColumns] = useState([
        { id: "col1", titulo: "Por hacer", tasks: data },
        { id: "col2", titulo: "En progreso", tasks: data },
        { id: "col3", titulo: "Completado", tasks: data },

    ]);

  return (
    <>

    <Grid columns={`repeat(${columns.length}, 1fr)`} gap="4">
        {columns.map((column) => 
            <Column
                key={column.id}
                titulo={column.titulo}
                tareas={column.tasks}
            />
        )}
    </Grid>
    </>
  )
}
