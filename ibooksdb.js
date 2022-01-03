import sqlite3 from "sqlite3";
import { ANNOTATION_PATH, BOOK_PATH } from "./config.js";

class bookDb {
  constructor() {
    this.db = new sqlite3.Database(ANNOTATION_PATH, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the annotation database.");
    });
    this.db.serialize(() => {
      this.db.run(`attach database '${BOOK_PATH}' as books`);
    });
  }

  async getAnnotations() {
    const { db } = this;
    const sql = `select 
		ZANNOTATIONASSETID as asset_id,
		ZTITLE as title,
		ZAUTHOR as author,
		ZANNOTATIONSELECTEDTEXT as selected_text,
		ZANNOTATIONNOTE as note,
		ZANNOTATIONREPRESENTATIVETEXT as represent_text,
		ZFUTUREPROOFING5 as chapter,
		ZANNOTATIONSTYLE as style,
		ZANNOTATIONMODIFICATIONDATE as modified_date,
		ZANNOTATIONLOCATION as location
		from ZAEANNOTATION
		left join books.ZBKLIBRARYASSET
		on ZAEANNOTATION.ZANNOTATIONASSETID = books.ZBKLIBRARYASSET.ZASSETID
		order by ZANNOTATIONASSETID, ZPLLOCATIONRANGESTART
		;`;
    try {
      return new Promise((resolve, reject) => {
        db.all(sql, (err, results) => {
          if (err) {
            console.log(`Problem with Table? ${err}`);
            reject(`Problem with Table? ${err}`);
          }
          resolve(results);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
}
const books = new bookDb();
export default books;
