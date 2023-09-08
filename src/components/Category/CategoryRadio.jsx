import Category from "./Category";

function CategoryRadio() {
  const categoryArr = ['전체', '자유', '일상', '고민', '코디', '용품', '정보'];
  return (
    <form>
      <fieldset>
        <legend className="sr-only">카테고리</legend>
        <div
        className="flex justify-center gap-x-0.5">
          {categoryArr.map((value, index) => (
            <Category
              key={index}
              value={value}
              index={index} />
          ))}
        </div>
      </fieldset>
    </form>
  );
}

export default CategoryRadio;
