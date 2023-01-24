import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  stock: number;

  @Column()
  shipping: boolean;

  @Column()
  featured: boolean;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  stars: number;
}

// {id,
//     stock,
//     price,
//     shipping,
//     colors:[],
//     category,
//     images:[],
//     reviews,
//     stars,
//     name,
//     description,
//     company
//     }
