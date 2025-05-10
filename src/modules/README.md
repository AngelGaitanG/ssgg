
# 🧩 Estructura de Módulos - Proyecto NestJS

Este proyecto utiliza una estructura modular **simple, clara y mantenible**. Cada módulo representa una funcionalidad concreta y está organizado de forma que el flujo de datos y responsabilidades sea fácilmente entendible y escalable.

## 📁 Estructura de cada módulo

Cada módulo contiene:

```

/<modulo>
│
├── dto/               → Data Transfer Objects con class-validator
│
├── entity/            → Entidades (esquemas de mongoose)
│
├── db/                → Interfaces DAO y servicios concretos (ORM)
│   ├── interfaz.dao.ts
│   └── mongodb.service.ts
│
├── modulo.controller.ts  → Recibe y valida las peticiones HTTP
├── modulo.service.ts     → Aplica lógica de negocio
└── modulo.module.ts      → Configura imports, providers y controllers

````

---

## 🧠 Descripción de Archivos NestJS Clave

- **`modulo.module.ts`**  
  Define y agrupa todos los elementos del módulo (controllers, providers, imports).  
  Es donde se configuran dependencias.

- **`modulo.controller.ts`**  
  Maneja las rutas y peticiones HTTP.  
  Cada ruta debe estar protegida con decoradores como `@UseGuards(JwtAuthGuard)` y `@Roles('rol')` según sea necesario.

- **`modulo.service.ts`**  
  Contiene la lógica de negocio del módulo.  
  Este servicio llama al repositorio definido en `db/` para interactuar con la base de datos.

---

## 🗃️ Carpeta `db/`

Aquí se divide en dos responsabilidades:

### DAO Interface
```ts
export interface IEntidadDao {
   create(entidad: CreateEntidadDto): Promise<Entidad>;
   findAll(): Promise<Entidad[]>;
}
````

### MongoDB Service / Repositorio

```ts
@Injectable()
export class EntidadMongodbService implements IEntidadDao {
  constructor(
    @InjectModel(Entidad.name)
    private readonly entidadModel: Model<Entidad>,
  ) {}

  create(entidad: CreateEntidadDto): Promise<Entidad> {
    return this.entidadModel.create(entidad);
  }

  findAll(): Promise<Entidad[]> {
    return this.entidadModel.find().exec();
  }
}
```

Este servicio implementa la interfaz DAO y actúa como puente entre la lógica de negocio y la base de datos.

---

## 🚦 Flujo de ejecución

```txt
[Petición HTTP] 
      ↓
[Controller]
      ↓
[Service (Lógica de negocio)]
      ↓
[MongoDB Service (db/)]
```

---

## ✅ Buenas prácticas

* **Usar siempre `class-validator` en los DTOs** para validar la entrada de datos.
* **Prolijidad en la estructura del código**: ayuda a mantener velocidad y claridad en el desarrollo.
* **Protección en Controllers**: siempre usar `@UseGuards(JwtAuthGuard)` y `@Roles(...)` según corresponda.
* **Evitar dependencias circulares**:
  Si necesitás usar entidades de otro módulo, importá solo los modelos necesarios en lugar de todo el servicio.

```

