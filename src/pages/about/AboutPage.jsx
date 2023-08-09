import React from 'react'

export default function AboutPage() {
    const imageWidth = 450;
    const imageHeight = 460;
    const image = {
        background: '#fff',
        padding: 9,
        boxSizing: 'border-box',
    }

    const align = {
        alignItems: 'start'
    }

    const p1 = {
        paddingLeft: 20,
        boxSizing: 'border-box'
    }
    const p2 = {
        paddingRight: 20,
        boxSizing: 'border-box'
    }

    return (
        <section className='about-page-container' style={{margin: '0 50px', padding: '0 10px 50px 20px' }}>
            <h3>¿Por qué?</h3>
            <div className='flex between' style={align}>
                <div className='about-image-container animate__animated animate__fadeInLeft'>
                        <img style={{...image, transform: 'rotate(-3deg)'}} width={ imageWidth } height={ imageHeight } 
                        src="https://cdn0.salir.com/es/articles/2/6/3/donde_jugar_a_los_dardos_en_barcelona_1362_600.jpg" alt="" 
                        />      
                </div>
                <div>
                    <p style={p1}>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).</p>
                    <p style={p1}>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).</p>
                </div>
            </div>
            
            <div className='flex between down' style={align}>
                <div>
                    <p style={p2}>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).</p>
                    <p style={p2}>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).</p>
                </div>
                <div className='about-image-container animate__animated animate__fadeInRight'>
                        <img style={{...image, transform: 'rotate(3deg)'}} width={ imageWidth } height={ imageHeight } 
                        src="https://s3-eu-west-1.amazonaws.com/rentabilibar/media/actualidad/337/thumb.jpg" alt="" 
                        />      
                </div>
            </div>
    </section>
    )
}
