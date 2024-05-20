import { Field, Form, Formik } from 'formik';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

function SearchBar({ onSearch }) {
    return (
    <Formik
      initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (values.query.trim() !== '') {
            onSearch(values.query);
          actions.resetForm();
          } else {
           toast.error("The search field is empty. Please try again!");
          }
          return
      }}
    >
      <Form className={css.form}>
        <Field className={css.input} type="text" name="query" placeholder="Search images and photos" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default SearchBar
